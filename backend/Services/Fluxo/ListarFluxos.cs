namespace Tis4.Services.Fluxo.ListarFluxos;

using Tis4.Services.Fluxo.Interfaces.IListarFluxos;
using Tis4.Models.Fluxo.FluxoModel;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class ListarFluxos : IListarFluxos{

    public List<FluxoModel> ListarTipoFluxos(){

        List<FluxoModel> fluxosEncontrados = new List<FluxoModel>();
        
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Fluxo\" ", conn);

        var reader = cmd.ExecuteReader();

        while (reader.Read()){

            FluxoModel fluxo = new FluxoModel();

            fluxo.IDFluxo       = (int)reader["id"];
            fluxo.nome          = reader["nome"].ToString();

            fluxosEncontrados.Add(fluxo);
            
        }

        conn.Close();

        return fluxosEncontrados;

    }
}