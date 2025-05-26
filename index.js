#!/usr/bin/env node

// importações de modulos
const DirectoryAnalizer = require('./modules/DirectoryAnalizer');
const help = require('./modules/helpme');


const input = (process.argv).slice(2);

if (input.length === 0 || process.argv.includes('--help')) {
    help();
    process.exit(0);
}


// o valor padrão garantirá que o print seja executado
let comando, args;
if (input[0] && (input[0].startsWith('-') || input[0].startsWith('--'))) [comando, ...args] = input;
else {
    // o valor padrão garantirá que o print seja executado
    comando = 'defaultValue';
    [...args] = input;
}


const funcoes = {
    print: async (dirName) => {
        console.log(`---------- LISTANDO O DIRETÓRIO --------------`);
        console.log(`Caminho do diretório: ${dirName}`);
        await DirectoryAnalizer.printTree(dirName);
    },

    generate: async (dirName, outputFileName, outputPath) => {
        console.log('--------- GERANDO ARQUIVO -------------');
        await DirectoryAnalizer.writeTree(dirName, outputFileName, outputPath);
        console.log(`-> Sucesso ao gerar diretório.`);
        console.log(`-> Diretório analisado: ${dirName}`);
        console.log(`-> Diretório onde foi gerado o log: ${outputPath}, nome do arquivo: "${outputFileName}"`);
    },

    search: async (dirName, fileName) => {
        console.log(`--------PROCURANDO ARQUIVO-----------`);
        console.log(`-> Procurando "${fileName}" no diretório "${dirName}".`)
        const result = await DirectoryAnalizer.searchTree(dirName, fileName);

        if (result) console.log(`-> Arquivo encontrado com sucesso no diretório: "${result}"`);
        else console.log('Arquivo não encontrado');

    }
}

const comandos = {
    '--list': funcoes.print,
    '-l': funcoes.print,
    'defaultValue': funcoes.print,

    '--generate': funcoes.generate,
    '-g': funcoes.generate,

    '--search': funcoes.search,
    '-s': funcoes.search,

}

// console.log('comando: ', comando);
// console.log('args: ', args);

if (comandos[comando]) comandos[comando]?.(...args);
else console.log('Erro: comando não reconhecido, veja os comandos usando: node index.js');

/**
 * comandos de teste:
 *  -> printar diretório
 *      node index.js --list "C:/Users/wslin/Desktop/Pasta de Teste"
 *      node index.js -l "C:/Users/wslin/Desktop/Pasta de Teste"
 *      node index.js "C:/Users/wslin/Desktop/Pasta de Teste"
 *  
 *  -> gerar txt com a estrutura do repositório
 *      node index.js --generate "C:/Users/wslin/Desktop/Pasta de Teste"
 *      node index.js -g "C:/Users/wslin/Desktop/Pasta de Teste"
 * 
 *  -> Procurar arquivo num diretório
 *      node index.js --search "C:/Users/wslin/Desktop/Pasta de Teste" "teste.txt"
 *      node index.js -s "C:/Users/wslin/Desktop/Pasta de Teste" "teste.txt"
 * 
 * C:/Users/wslin/Downloads 
 */
