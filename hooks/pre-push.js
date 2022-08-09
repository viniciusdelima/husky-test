const { exec } = require('child_process')

const params = process.argv.slice(2)

if (params.length === 2) {
    const [ currentBranch ] = params[1].split('/')
        .filter((value) => value.indexOf('.git') !== -1)
        .map((value) => {
            return value.replace('.git', '')
        })
    
    try {
        exec('git checkout develop && git status && git pull origin develop', (error, stdout, stderr) => {
            if (error) {
                throw new Error(error)
            } else if (stderr) {
                throw new Error(stderr)
            }
            console.log(stdout)
        })
    } catch (e) {
        console.log(`Um erro ocorreu. ${e.message}`)
        exec(`git checkout ${currentBranch}`)
    }
} else {
    console.log('Branch origem e/ou destino não informados!')
}