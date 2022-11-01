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

        var cmd = new NpgsqlCommand("INSERT INTO public.\"Projeto\"(\"idinstituicao\",\"idfluxo\",\"idusuarioalteracao\",\"nome\",\"coordenador\",\"dataCriacao\",\"dataAlteracao\") VALUES (@IDInstituicao,@IDFluxo,@IDUsuario,@Nome,@Coordenador,@DataCriacao,@DataAlteracao) RETURNING id", conn);

        cmd.Parameters.AddWithValue("IDInstituicao", projeto.IDinstituicao);
        cmd.Parameters.AddWithValue("IDFluxo", projeto.IdFluxo);
        cmd.Parameters.AddWithValue("IDUsuario", projeto.IDusuario);
        cmd.Parameters.AddWithValue("Nome", projeto.nome);
        cmd.Parameters.AddWithValue("Coordenador",projeto.coordenador);
        cmd.Parameters.AddWithValue("DataCriacao",DateTime.Now);
        cmd.Parameters.AddWithValue("DataAlteracao",DateTime.Now);

        int IDRetornado = (int)cmd.ExecuteScalar();

        conn.Close();

        relacionarEtapasFluxoComProjeto(IDRetornado, projeto.IdFluxo);

    }


    public void relacionarEtapasFluxoComProjeto(int idProjeto, int idFluxo){

        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"etapa\" WHERE idfluxo = @ID", conn);

        cmd.Parameters.AddWithValue("ID", idFluxo);

        var reader = cmd.ExecuteReader();

        while(reader.Read()){

            var connFluxoEtapa = new DataBaseConnection().dataBaseConnection();

            connFluxoEtapa.Open();

            var cmdFluxoEtapa = new NpgsqlCommand("INSERT INTO public.\"fluxoetapa\"(\"idfluxo\",\"idetapa\", \"concluida\", \"idprojeto\", \"datacriacao\",\"datafinalizacao\") VALUES (@idfluxo, @EtapaId, @Concluida, @ProjetoID, @DataCriacao, @DataFinalizacao)", connFluxoEtapa);

            cmdFluxoEtapa.Parameters.AddWithValue("idfluxo", idFluxo);
            cmdFluxoEtapa.Parameters.AddWithValue("EtapaId", (int)reader["id"]);
            cmdFluxoEtapa.Parameters.AddWithValue("Concluida", false);
            cmdFluxoEtapa.Parameters.AddWithValue("ProjetoID", idProjeto);
            cmdFluxoEtapa.Parameters.AddWithValue("Datacriacao", DateTime.Now);
            cmdFluxoEtapa.Parameters.AddWithValue("DataFinalizacao", DateTime.Now);

            var readerEtapaFluxo = cmdFluxoEtapa.ExecuteReader();

            readerEtapaFluxo.Read();
        }

        conn.Close();
    }
}