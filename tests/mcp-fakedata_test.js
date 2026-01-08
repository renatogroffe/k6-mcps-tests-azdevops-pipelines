import { check, sleep } from 'k6';
import mcp from 'k6/x/mcp';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.2/index.js";

export const options = {
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default function () {
    const client = new mcp.StdioClient({
        path: 'docker',
        args: ['run', '-i', '--rm', 'renatogroffe/dotnet9-consoleapp-mcp-fakedata'],
    });

    console.log('MCP (stdio) server running:', client.ping());

    console.log('Tools available:');
    const tools = client.listAllTools().tools;
    tools.forEach(tool => console.log(`  - ${tool.name}`));

    const toolResult1 = client.callTool({ name: 'gerar_dados_produtos_fake', arguments: { numberOfRecords: 3 } });
    console.log(`gerar_dados_produtos_fake tool - Response: "${toolResult1.content[0].text}"`);
    const objToolResult1 = JSON.parse(toolResult1.content[0].text);
    console.log(objToolResult1.message);

    const toolResult2 = client.callTool({ name: 'gerar_dados_contatos_fake', arguments: { numberOfRecords: 4 } });
    console.log(`gerar_dados_contatos_fake tool - Response: "${toolResult2.content[0].text}"`);
    const objToolResult2 = JSON.parse(toolResult2.content[0].text);
    console.log(objToolResult2.message);

    const toolResult3 = client.callTool({ name: 'gerar_dados_empresas_fake', arguments: { numberOfRecords: 5 } });
    console.log(`gerar_dados_empresas_fake tool - Response: "${toolResult3.content[0].text}"`);
    const objToolResult3 = JSON.parse(toolResult3.content[0].text);
    console.log(objToolResult3.message);

    check(objToolResult1, { 'gerar_dados_produtos_fake': (r) => r.isSuccess === true && r.data.length == 3 });
    check(objToolResult2, { 'gerar_dados_contatos_fake': (r) => r.isSuccess === true && r.data.length == 4 });
    check(objToolResult3, { 'gerar_dados_empresas_fake': (r) => r.isSuccess === true && r.data.length == 5 });

    sleep(1);
}

export function handleSummary(data) {
  return {
    "results-report.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}