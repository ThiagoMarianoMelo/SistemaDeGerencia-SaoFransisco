
namespace  Tis4.Models.Projeto.ProjetoModel;

public class ProjetoModel{

    public int ID { get; set; }

    public int IDFluxo { get; set; }

    public int IDInstituicao { get; set; }

    public int IDUsuarioAlteracao { get; set; }

    public String? etapaAtual  { get; set; }

    public String? coordenador { get; set; }

    public String? nome { get; set; }

    public DateTime dataCriacao { get; set; }

    public DateTime dataAlteracao { get; set; }

    public String? usuarioUltimaAlteracao { get; set; }

}