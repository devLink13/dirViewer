module.exports = () => {
  console.log(`
Uso: node index.js <diretorio> [opções]

Comandos:
  <diretorio>         Caminho para o diretório a ser processado

Opções:
  --help              Exibe esta mensagem de ajuda
  --list ou -l        Lista todos os arquivos no diretório
  --generate ou -g    Gera um arquivo .txt com a estrutura de pastas do diretório
  --search ou -s      Procura um arquivo dentro do diretório específicado para a busca

Exemplos:
  dir-viewer --help
  dir-viewer ./meu-diretorio --list
  dir-viewer ./meu-diretorio --generate "C:/Users/Desktop" "nome_do_arquivo.txt" "C:/Users/Desktop"
`);
}