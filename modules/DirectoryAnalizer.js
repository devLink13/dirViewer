/**
 * Gerar uma classe de analize de diretórios
 * 
 */

const fs = require('fs').promises;
const path = require('path');

class DirectoryAnalizer {
    constructor(dirName) {
        this.dirName = path.resolve(dirName);
    }

    // método static de classe usado para ler os arquivos dos diretorios
    static async #loadTree(dirName) {
        try {
            const files = await fs.readdir(path.resolve(dirName));
            return files;
        }
        catch (e) {
            console.log('Erro ao carregar o diretório.');
        }
    }

    // funcao static privada de classe para escrever em um txt
    static async #writeTree(fileName, pathFile, text) {
        try {
            const filePath = path.resolve(pathFile, fileName);
            await fs.appendFile(filePath, text + '\n');
        }
        catch (error) {
            console.log('Erro ao escrever o arquivo: ', error);
        }
    }


    // FUNCAO QUE SIMPLESMENTE EXIBE A ARVORE
    static async printTree(dirName) {

        const files = await this.#loadTree(dirName);
        await _walkAndPrintTree(files, dirName);

        async function _walkAndPrintTree(files, dir, nivel = 0) {

            for (let file of files) {
                const filePath = path.resolve(dir, file);

                // verificando se é uma pasta ou não
                let stats;
                try {
                    stats = await fs.stat(filePath);
                }
                catch (error) {
                    console.log(`erro ao acessar: ${filePath}`);
                }

                // logar o nome da pasta
                console.log(`${'    '.repeat(nivel)}|--${file}`);

                // recursão para subdiretórios
                if (stats.isDirectory()) {
                    const subFiles = await fs.readdir(filePath);
                    await _walkAndPrintTree(subFiles, filePath, nivel + 1);
                }
            }
        }
    }

    // FUNCAO PARA ESCREVER UM LOG TXT COM A ESTRUTURA DO DIRETÓRIO
    static async writeTree(dirName, outputFileName, pathOutput) {
        try {
            const files = await this.#loadTree(dirName);
            await _walkAndWriteTree(files, dirName);

            async function _walkAndWriteTree(files, dir, nivel = 0) {
                for (let file of files) {
                    const filePath = path.resolve(dir, file);

                    // verificando se é uma pasta ou não
                    let stats;
                    try {
                        stats = await fs.stat(filePath);
                    }
                    catch (error) {
                        console.log(`erro ao gerar : ${filePath}`);
                    }

                    //escrever no arquivo gerado
                    const text = `${'    '.repeat(nivel)}|--${file}`
                    await DirectoryAnalizer.#writeTree(outputFileName, pathOutput, text);

                    // recursão para subdiretórios
                    if (stats.isDirectory()) {
                        const subFiles = await fs.readdir(filePath);
                        await _walkAndWriteTree(subFiles, filePath, nivel + 1);
                    }
                }
            }
        }
        catch (error) {
            console.log('Erro ao gerar o arquivo: ', error);
        }
    }

    // FUNCAO QUE PROCURA UM ARQUIVO NA ARVORE DO DIRETÓRIO
    static async searchTree(dirName, fileName) {
        const files = await this.#loadTree(dirName);
        return await _walkAndSearchTree(files, dirName, fileName);

        async function _walkAndSearchTree(files, dir, fileName, nivel = 0) {
            for (let file of files) {
                const filePath = path.resolve(dir, file);

                // verificar se o arquivo procurado foi achado
                if (file === fileName) return filePath;

                // verificando se é uma pasta ou não
                let stats;
                try {
                    stats = await fs.stat(filePath);
                }
                catch (error) {
                    console.log(`erro ao gerar : ${filePath}`);
                }

                // recursão para subdiretórios
                if (stats.isDirectory()) {
                    const subFiles = await fs.readdir(filePath);
                    const found = await _walkAndSearchTree(subFiles, filePath, fileName, nivel + 1);
                    if (found) return found;
                }
            }
            return null; // não encontrado
        }
    }

}


module.exports = DirectoryAnalizer;
