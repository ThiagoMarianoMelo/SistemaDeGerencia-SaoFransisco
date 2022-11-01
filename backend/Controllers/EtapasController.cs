using Microsoft.AspNetCore.Mvc;

namespace Tis4.Controllers.EtapasController;

using Tis4.Services.Etapa.Interfaces.IListarEtapasProjeto;
using Tis4.Services.Etapa.listarEtapasProjeto;
using Tis4.Models.Etapa.ListarEtapasProjetoModel;
using Tis4.Models.Etapa.FinalizarEtapaModel;
using Tis4.Services.Etapa.ConcluirEtapaProjeto;
using Tis4.Services.Etapa.Interfaces.IConcluirEtapaProjeto;

public class EtapasController : ControllerBase{

    public IListarEtapasProjeto ListandoEtapasProjeto;
    public IConcluirEtapaProjeto ConcluirEtapaProjeto;

    public EtapasController(){

        ListandoEtapasProjeto = new ListarEtapasProjeto();
        ConcluirEtapaProjeto = new ConcluirEtapaProjeto();
    }   

    [HttpGet]
    [Route("Instituicoes/Projetos/Fluxos/Etapas")]
    public List<ListarEtapasProjetoModel> ListEtapasProjeto([FromQuery()] int id) => ListandoEtapasProjeto.listarEtapasProjeto(id);

    [HttpGet]
    [Route("Instituicoes/Projetos/Fluxos/Etapas/Detalhes")]
    public List<ListarEtapasProjetoModel> ObterDetalhesEtapa([FromQuery()] int id) => ListandoEtapasProjeto.listarEtapasProjeto(id);

    [HttpPatch]
    [Route("Instituicoes/Projetos/Fluxos/Etapas")]
    public void ConcluirFase([FromBody] FinalizarEtapaModel caminhoAlteracaoEtapa) => ConcluirEtapaProjeto.concluirEtapa(caminhoAlteracaoEtapa);

}