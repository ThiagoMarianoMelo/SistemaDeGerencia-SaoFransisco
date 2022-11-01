namespace Tis4.Services.Etapa.Interfaces.IListarEtapasProjeto;

using Tis4.Models.Etapa.ListarEtapasProjetoModel;

public interface IListarEtapasProjeto{

    public List<ListarEtapasProjetoModel> listarEtapasProjeto(int IDProjeto);
}