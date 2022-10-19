namespace Tis4.Services.Instituicao.Interfaces.IVisualizarInstiuicoes;

using Tis4.Models.Instituicao.InstituicaoModel;

public interface IVisualizarInstiuicoes{

    public List<InstituicaoModel> listarTodasInstituicoes();
    
}