const core = require('@actions/core');
const github = require('@actions/github');
const path = require("path");

const os = require('os');
const fs = require('fs');

const main = async () => {
    try {
       /*
        HCL OneTest API parameters.
        */
        //API settings
		var script = '';
        const productpath = core.getInput('productPath', true);
		const paramfile = core.getInput('parameterfile', false);
		
		if (paramfile) {
            script = 'cd ' + '"'+productpath+'"' + '\n'
            + './RunTests' 
            + ' -parameterFile ' + '"' + paramfile + '"'
		}
 
        else {
            const projectdir = core.getInput('projectDir', true);
            var projectname = core.getInput('projectName', true);
            const environment = core.getInput('environment', true);
            var tests = core.getInput('tests', true);

            if(!projectname.includes('.ghp')){
                projectname = projectname+'.ghp';
            }

            script = 'cd ' + '"'+productpath+'"' + '\n'
            + './RunTests' 
            + ' -project ' + '"' + projectdir + path.sep + projectname + '"'
            + ' -run ' + '"' + tests + '"'
            + ' -environment ' + environment;
        }

        const junitDir = core.getInput('junitDir', false);

        if (junitDir) {
            script = script.concat(' -junitDir '+'"'+ junitDir +'"');
        }

		// var tests ='';
        // if(configtype == 'simple'){
        //     const projectdir = core.getInput('projectDir', true);
        //     var projectname = core.getInput('projectName', true);
        //     const environment = core.getInput('environment', true);
        //     tests = core.getInput('tests', true);
        //     const junitDir = core.getInput('junitDir', false);
                 
        //     if(!projectname.includes('.ghp')){
        //         projectname = projectname+'.ghp';
        //     }
            
        //     //Script formation
        //     script = 'cd ' + '"'+productpath+'"' + '\n'
        //                 + './RunTests' 
        //                 + ' -project ' + '"' + projectdir + path.sep + projectname + '"'
        //                 + ' -run ' + '"' + tests + '"'
        //                 + ' -environment ' + environment;
            
		// 	if(junitDir===null){
        //       script = script.concat(' -junitDir '+'"'+ junitDir +'"');
        //     }
        // } else{
        //     const paramfile = core.getInput('parameterfile', true);
        //     script = 'cd ' + '"'+productpath+'"' + '\n'
		// 			+ './RunTests' 
		// 			+ ' -parameterFile ' + '"' + paramfile + '"'
        // }

        let tempDir = os.tmpdir();
        let filePath = path.join(tempDir, tests + '.ps1');
        await fs.writeFileSync(
            filePath,
            script,
            { encoding: 'utf8' });

        console.log(script);
        console.log('========================== Starting Command Output ===========================');
        var spawn = require("child_process").spawn, child;
        child = spawn("powershell.exe", [filePath]);
        child.stdout.on("data", function (data) {
            console.log(" " + data);
        });
        child.stderr.on("data", function (data) {
            console.log("Errors: " + data);
        });
        child.on("exit", function () {
            console.log("Powershell Script finished");

        });
        await new Promise((resolve) => {
            child.on('close', resolve)
        });
        child.stdin.end();

        console.log("");
    }

    catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();
