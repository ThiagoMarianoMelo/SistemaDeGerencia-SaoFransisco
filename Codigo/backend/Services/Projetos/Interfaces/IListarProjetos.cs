namespace Tis4.Services.Projetos.Interfaces.IListarProjetos;

using Tis4.Models.Instituicao.InstituicaoModel;
using Tis4.Models.Projeto.ProjetoModel;

public interface IListarProjetos{
    public List<ProjetoModel> listarProjetosPorInstituicao(InstituicaoModel instituicaoResponsavel);
}