namespace Tis4.Services.Projetos.Interfaces.IListarProjetos;

using Tis4.Models.Projeto.ProjetoModel;

public interface IListarProjetos{
    public List<ProjetoModel> listarProjetosPorInstituicao(int IDInstituicaoResponsavel);
}