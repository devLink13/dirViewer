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
    print: (dirName) => {
        console.log(`---------- LISTANDO O DIRETÓRIO --------------`);
        console.log(`Caminho do diretório: ${dirName}`);
        DirectoryAnalizer.printTree(dirName);
    },

    generate: (dirName, outputFileName, outputPath) => {
        console.log('--------- GERANDO ARQUIVO -------------');
        DirectoryAnalizer.writeTree(dirName, outputFileName, outputPath);
        console.log(`-> Sucesso ao gerar diretório.`);
        console.log(`-> Diretório analisado: ${dirName}`);
        console.log(`-> Diretório onde foi gerado o log: ${outputPath}, nome do arquivo: "${outputFileName}"`);
    }
}

const comandos = {
    '--list': funcoes.print,
    '-l': funcoes.print,
    'defaultValue': funcoes.print,

    '--generate': funcoes.generate,
    '-g': funcoes.generate,

}

// console.log('comando: ', comando);
// console.log('args: ', args);

if (comandos[comando]) comandos[comando]?.(...args);
else console.log('Erro: comando não reconhecido, veja os comandos usando: node index.js');

/**
 * comandos de teste:
 *  -> printar diretório
 *      node index.js --print "C:/Users/wslin/Desktop/Pasta de Teste"
 *      node index.js -p "C:/Users/wslin/Desktop/Pasta de Teste"
 *      node index.js "C:/Users/wslin/Desktop/Pasta de Teste"
 *  
 *  -> gerar txt com a estrutura do repositório
 *      node index.js -g "C:/Users/wslin/Desktop/Pasta de Teste"
 * 
 * 
 * C:/Users/wslin/Downloads 
 */
