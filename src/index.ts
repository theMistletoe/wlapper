import {Command, flags} from '@oclif/command'
import { exec } from 'child_process'
import { promisify } from 'util';
const execPromise = promisify(exec);

class Wlapper extends Command {
  static description = 'this is Lambda container images\'s local execution wrapper.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    port: flags.string({char: 'p' , description: 'port to listen on'}),
    tag: flags.string({char: 't', description: 'docker image\'s tag'}),
    data: flags.string({char: 'd', description: 'request data to lambda'}),
  }

  static args = [{name: 'image', description: 'docker image name'}]

  async run() {
    const {args, flags} = this.parse(Wlapper)
    const { port, tag, data } = flags
    const { image } = args

    const tempName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
      await execPromise(`docker run -d --rm --name=${tempName} -p ${port ?? '9000'}:8080 ${image}${tag ? ':'+ tag : ''}`);

      const {
        stdout,
        stderr
      } = await execPromise(`curl -X POST -sS http://localhost:${port}/2015-03-31/functions/function/invocations -d \'${data}\'`);
      if (stderr) return console.error(stderr);
      console.log(stdout);

    } catch (e) {
      console.log(e)
    } finally {
      try {
        await execPromise(`docker stop ${tempName}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export = Wlapper;
