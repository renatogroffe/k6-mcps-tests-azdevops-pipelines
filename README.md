# k6-mcps-tests-azdevops-pipelines
Exemplo de implementação de testes de validação com k6 para MCP Servers e que inclui execução automatizada a partir de um pipeline do Azure DevOps. Inclui o build do executável do k6 com a extensão para MCPs via container.

---

## Resultados da execução dos testes

Testes executados via pipeline (em ambiente Linux):

![Execução do pipeline](img/k6-pipeline-01.png)

Relatório HTML com resultados do k6 - Métricas:

![Relatório HTML do k6 - parte 1](img/k6-pipeline-02.png)

Relatório HTML com resultados do k6 - Detalhes da Execução:

![Relatório HTML do k6 - parte 2](img/k6-pipeline-03.png)

Relatório HTML com resultados do k6 - Validações/Checks:

![Relatório HTML do k6 - parte 3](img/k6-pipeline-04.png)

Resultados no formato Markdown:

![Relatório Markdown com resultados do k6](img/k6-pipeline-05.png)