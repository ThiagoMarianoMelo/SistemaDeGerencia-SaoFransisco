using Microsoft.AspNetCore.Mvc;
using Tis4.Services.Instituicao.Interfaces.IVisualizarInstiuicoes;
using Tis4.Services.Instituicao.Interfaces.IDeletarInstituicao;
using Tis4.Services.Instituicao.Interfaces.IAtualizarInstituicao;
using Tis4.Services.Instituicao.Interfaces.ICadastrarInstituicao;
using Tis4.Services.Instituicao.listarInstituicao;
using Tis4.Models.Instituicao.InstituicaoModel;
using Tis4.Services.Instituicao.DeletarInstituicao;
using Tis4.Services.Instituicao.AtualizarInstituicao;
using Tis4.Services.Instituicao.CadastrarInstituicao;
using Tis4.Models.Instituicao.CadastrarInstituicaoModel;

namespace Tis4.Controllers.Instituicao.InstituicaoController;

public class InstituicaoController : ControllerBase
{
    public IVisualizarInstiuicoes VisualizarInstiuicoes;
    public  IDeletarInstituicao DeletarInstituicao;
    public IAtualizarInstituicao AtualizarInstituicao;
    public ICadastrarInstituicao CadastrarInstituicao;

    public InstituicaoController(){
    
        VisualizarInstiuicoes = new listarInstituicao();
        DeletarInstituicao =  new  DeletarInstituicao();
        AtualizarInstituicao = new AtualizarInstituicao();
        CadastrarInstituicao = new CadastrarInstituicao();
    }   

    [HttpGet]
    [Route("/Instituicoes")]
    public List<InstituicaoModel> ListInstituicoes() => VisualizarInstiuicoes.listarTodasInstituicoes();


    [HttpPost]
    [Route("/Instituicoes")]
    public void CadastroDeInstituicao([FromBody]CadastrarInstituicaoModel instituicao) => CadastrarInstituicao.cadastrarInstituicao(instituicao);

    [HttpDelete]
    [Route("/Instituicoes")]
    public void DeleteInstituicao([FromQuery]int ID) => DeletarInstituicao.deletarInstituicao(ID);

    [HttpPut]
    [Route("/Instituicoes")]
    public void AttInstituicao([FromBody] InstituicaoModel instituicao) => AtualizarInstituicao.AtualizarInstituicao(instituicao);
}
