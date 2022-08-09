const { exec } = require('child_process')

const params = process.argv.slice(2)

if (params.length === 2) {
    const [ currentBranch ] = params[1].split('/')
        .filter((value) => value.indexOf('.git') !== -1)
        .map((value) => {
            return value.replace('.git', '')
        })
    
    exec('git checkout develop && git status && git pull origin develop', (error, stdout, stderr) => {
        if (error) {
            console.log(`Um erro ocorreu. ${error}`)
            return ;
        } else if (stderr) {
            console.log(`Stderr. ${stderr}`)
            return ;
        }
        console.log(stdout)
    })
} else {
    console.log('Branch origem e/ou destino não informados!')
}