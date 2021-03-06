import {Command, flags} from '@oclif/command'
import axios from 'axios';
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

    if (!image) throw new Error('You need to specify the docker image.');

    const tempName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
      await execPromise(`docker run -d --rm --name=${tempName} -p ${port ?? '9000'}:8080 ${image}${tag ? ':'+ tag : ''}`);

      axios.post(
        `http://localhost:${port ?? '9000'}/2015-03-31/functions/function/invocations`,
        data
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

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
