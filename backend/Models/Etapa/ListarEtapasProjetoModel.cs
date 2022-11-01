namespace Tis4.Models.Etapa.ListarEtapasProjetoModel;

public class ListarEtapasProjetoModel{

    public int idFluxo { get; set; }

    public int idEtapa { get; set; }

    public bool concluida { get; set; }

    public int idProjeto { get; set; }

    public DateTime dataCriacao { get; set; }

    public DateTime dataFinalizacao { get; set; }

    public string nomeEtapa { get; set; }
    
}