namespace Tis4.Controllers.FluxoController;

using Microsoft.AspNetCore.Mvc;
using Tis4.Models.Fluxo.FluxoModel;
using Tis4.Services.Fluxo.ListarFluxos;
using Tis4.Services.Fluxo.Interfaces.IListarFluxos;

public class FluxoController : ControllerBase{

    public IListarFluxos ListarFluxos;

    public FluxoController(){

        ListarFluxos = new ListarFluxos();

    }   

    [HttpGet]
    [Route("Instituicoes/Projetos/Fluxos")]
    public List<FluxoModel> ListFluxos() => ListarFluxos.ListarTipoFluxos();

}
