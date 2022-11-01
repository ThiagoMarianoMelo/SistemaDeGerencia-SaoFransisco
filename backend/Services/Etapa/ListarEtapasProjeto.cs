namespace Tis4.Services.Etapa.listarEtapasProjeto;

using Tis4.Services.Etapa.Interfaces.IListarEtapasProjeto;
using Tis4.Models.Etapa.ListarEtapasProjetoModel;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class ListarEtapasProjeto : IListarEtapasProjeto{

    public List<ListarEtapasProjetoModel> listarEtapasProjeto(int IDProjeto){
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"fluxoetapa\" WHERE \"idprojeto\" = @IDProjeto ORDER BY \"idetapa\" ASC", conn);

        cmd.Parameters.AddWithValue("IDProjeto", IDProjeto);

        var reader = cmd.ExecuteReader();

        List<ListarEtapasProjetoModel> EtapasProjeto = new List<ListarEtapasProjetoModel>();

        while(reader.Read()){

            ListarEtapasProjetoModel EtapaEncontrada = new ListarEtapasProjetoModel();

            EtapaEncontrada.idFluxo = (int)reader["idfluxo"];
            EtapaEncontrada.concluida = (bool)reader["concluida"];
            EtapaEncontrada.idEtapa = (int)reader["idetapa"];
            EtapaEncontrada.idProjeto = (int)reader["idprojeto"];
            EtapaEncontrada.dataCriacao = (DateTime)reader["datacriacao"];
            EtapaEncontrada.dataFinalizacao = (DateTime)reader["datafinalizacao"];

            var connNomeEtapa = new DataBaseConnection().dataBaseConnection();

            connNomeEtapa.Open();

            var cmdEtapaNome = new NpgsqlCommand("SELECT nome FROM public.\"etapa\" WHERE \"id\" = @IDEtapa", connNomeEtapa);

            cmdEtapaNome.Parameters.AddWithValue("IDEtapa", (int)reader["idetapa"]);

            var readerNomeEtapa = cmdEtapaNome.ExecuteReader();

            readerNomeEtapa.Read();

            EtapaEncontrada.nomeEtapa = readerNomeEtapa["nome"].ToString();

            EtapasProjeto.Add(EtapaEncontrada);  

            connNomeEtapa.Close();

        }  

        conn.Close();

        return EtapasProjeto;
    }
}