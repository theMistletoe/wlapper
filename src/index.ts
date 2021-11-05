import {Command, flags} from '@oclif/command'
import { exec, ExecException } from 'child_process'

class Sample extends Command {
  static description = 'describe the command here'

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
    const {args, flags} = this.parse(Sample)
    const { port, tag, data } = flags
    const { image } = args

    const tempName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    exec(`docker run -d --rm --name=${tempName} -p ${port ?? '9000'}:8080 ${image}${tag ? ':'+ tag : ''}`, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) return console.error(error);
      if (stderr) return console.error(stderr);

      exec(`curl -X POST -sS http://localhost:${port}/2015-03-31/functions/function/invocations -d \'${data}\'`, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) return console.error(error);
        if (stderr) return console.error(stderr);
        console.log(stdout);

        exec(`docker stop ${tempName}`, (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) return console.error(error);
          if (stderr) return console.error(stderr);
        })
      })
    })
  }
}

export = Sample
