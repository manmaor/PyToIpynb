// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function add_nb(output) {
    output["nbformat"] = 4;
    output["nbformat_minor"] = 2;
}

function add_metadata(output) {
    let metadata = { }

    output["metadata"] = metadata
}

function add_cells(output, cells) {
    let clls = [];
    let execution_count = 0;

    cells.forEach(function (cell) {
        let cellTrimed = cell.trim();
        let splitedCell = cell.split('\n')

        if (cellTrimed === "") {    
        } else if (splitedCell[0].trim() == "[markdown]") {
            // removing the [markdown]
            delete splitedCell[0]

            clls.push({
                "cell_type": "markdown",
                "metadata": {},
                "source": splitedCell.join('\n').split('\n# ').join('\n').trim()
            });
        } else if (splitedCell[0].trim() == "") {
            clls.push({
                "cell_type": "code",
                "metadata": {},
                "source": cell.trimLeft().trimRight(),
                "outputs":[],
                "execution_count": ++execution_count
            });
        }
    })

    output['cells'] = clls;
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {

        let output = {}
        add_nb(output)
        add_metadata(output)

        // vscode.workspace.getConfiguration().python // getting the python configurration for the metadata

        let editor = vscode.window.activeTextEditor;
        let document = editor.document
        if (editor) {
            let text = document.getText();
            let cells = text.split('\n# %%');
            add_cells(output, cells)
        }

        let filePath = document.fileName.replace('.py', '.ipynb');
        let fs = require('fs');
        let content = JSON.stringify(output)

        fs.writeFileSync(filePath, content, 'utf8')

        // Display a message box to the user
        vscode.window.showInformationMessage("Save to " + filePath);

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
