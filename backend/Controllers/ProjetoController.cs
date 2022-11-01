
namespace Tis4.Controllers.ProjetoController;

using Microsoft.AspNetCore.Mvc;
using Tis4.Models.Projeto.ProjetoModel;
using System.Collections.Generic;
using Tis4.Services.Projetos.Interfaces.IListarProjetos;
using Tis4.Services.Projetos.ListarProjetos;
using Tis4.Models.Projeto.CadastroProjetoModel;
using Tis4.Services.Projetos.Interfaces.ICadastrarProjeto;
using Tis4.Services.Projetos.CadastrarProjeto;
using Tis4.Services.Projetos.Interfaces.IDeletarProjeto;
using Tis4.Services.Projetos.DeletarProjeto;
using Tis4.Models.Projeto.AlterarProjetoModel;
using Tis4.Services.Projetos.Interfaces.IAlterarProjeto;
using Tis4.Services.Projetos.AlterarProjeto;

public class ProjetoController : ControllerBase{   

    IListarProjetos ListarProjetos;
    ICadastrarProjeto CadastrarProjeto;
    IDeletarProjeto DeletarProjeto;
    IAlterarProjeto AtualizarProjeto;

    public ProjetoController(){

        ListarProjetos = new ListarProjetos();
        CadastrarProjeto = new CadastrarProjeto();
        DeletarProjeto = new DeletarProjeto(); 
        AtualizarProjeto = new AlterarProjeto();
    }   

    [HttpGet]
    [Route("Instituicoes/Projetos")]
    public List<ProjetoModel> ListProjetosInstituicao([FromQuery] int ID) => ListarProjetos.listarProjetosPorInstituicao(ID);


    [HttpPost]
    [Route("Instituicoes/Projetos")]
    public void CadastrarProjetoInstituicao([FromBody] CadastroProjetoModel projeto) => CadastrarProjeto.cadastrarProjeto(projeto);

    [HttpDelete]
    [Route("Instituicoes/Projetos")]
    public void DeletarProjetoInstituicao([FromQuery] int ID) => DeletarProjeto.deletarProjeto(ID);

    [HttpPut]
    [Route("Instituicoes/Projetos")]
    public void AttProjeto([FromBody] AlterarProjetoModel projetoAtualizado) => AtualizarProjeto.alterarProjeto(projetoAtualizado);
}