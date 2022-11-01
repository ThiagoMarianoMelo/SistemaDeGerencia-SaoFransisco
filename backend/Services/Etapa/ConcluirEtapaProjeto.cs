namespace Tis4.Services.Etapa.ConcluirEtapaProjeto;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Services.Etapa.Interfaces.IConcluirEtapaProjeto;
using  Tis4.Models.Etapa.FinalizarEtapaModel;

public class ConcluirEtapaProjeto : IConcluirEtapaProjeto{
    public void concluirEtapa(FinalizarEtapaModel etapaProjeto){

        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("UPDATE public.\"fluxoetapa\" SET \"concluida\" = @Concluida WHERE \"idetapa\" = @IDEtapa AND \"idprojeto\" = @IDProjeto", conn);

        cmd.Parameters.AddWithValue("Concluida", true);
        cmd.Parameters.AddWithValue("IDEtapa", etapaProjeto.idEtapa);
        cmd.Parameters.AddWithValue("IDProjeto", etapaProjeto.idProjeto);

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}