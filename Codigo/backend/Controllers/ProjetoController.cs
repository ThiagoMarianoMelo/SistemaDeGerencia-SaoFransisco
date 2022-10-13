
namespace Tis4.Controllers.ProjetoController;

using Microsoft.AspNetCore.Mvc;
using Tis4.Models.Projeto.ProjetoModel;
using Tis4.Models.Instituicao.InstituicaoModel;
using System.Collections.Generic;
using Tis4.Services.Projetos.Interfaces.IListarProjetos;
using Tis4.Services.Projetos.ListarProjetos;
public class ProjetoController : ControllerBase
{   

    IListarProjetos ListarProjetos;

    public ProjetoController(){

        ListarProjetos = new ListarProjetos();
    }   

    [HttpPost]
    [Route("/Projetos")]
    public List<ProjetoModel> ListProjetosInstituicao(InstituicaoModel instituicaoResponsavel) => ListarProjetos.listarProjetosPorInstituicao(instituicaoResponsavel);

}