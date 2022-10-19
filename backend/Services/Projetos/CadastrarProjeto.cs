namespace Tis4.Services.Projetos.CadastrarProjeto;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Projeto.CadastroProjetoModel;
using Tis4.Services.Projetos.Interfaces.ICadastrarProjeto;

public class CadastrarProjeto : ICadastrarProjeto
{
    public void cadastrarProjeto(CadastroProjetoModel projeto){
        
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("INSERT INTO public.\"Projeto\"(\"idinstituicao\",\"idfluxo\",\"idusuarioalteracao\",\"etapaAtual\",\"nome\",\"coordenador\",\"dataCriacao\",\"dataAlteracao\") VALUES (@IDInstituicao,@IDFluxo,@IDUsuario,@Etapa,@Nome,@Coordenador,@DataCriacao,@DataAlteracao)", conn);

        cmd.Parameters.AddWithValue("IDInstituicao", projeto.IDinstituicao);
        cmd.Parameters.AddWithValue("IDFluxo", 1);
        cmd.Parameters.AddWithValue("IDUsuario", projeto.IDusuario);
        cmd.Parameters.AddWithValue("Nome", projeto.nome);
        cmd.Parameters.AddWithValue("Coordenador",projeto.coordenador);
        cmd.Parameters.AddWithValue("DataCriacao",DateTime.Now);
        cmd.Parameters.AddWithValue("DataAlteracao",DateTime.Now);

        var connFluxo = new DataBaseConnection().dataBaseConnection();

        connFluxo.Open();

        var cmdFluxo = new NpgsqlCommand("SELECT * FROM public.\"Fluxo\" WHERE \"id\" = @IDFluxo", connFluxo);

        cmdFluxo.Parameters.AddWithValue("IDFluxo", projeto.IdFluxo);

        var readerFluxo = cmdFluxo.ExecuteReader();

        readerFluxo.Read();
        String etapas = readerFluxo["etapas"].ToString();
        String[] etapasArray = etapas.Split(';');

        cmd.Parameters.AddWithValue("Etapa",etapasArray[0]);
        connFluxo.Close();

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}