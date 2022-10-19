namespace Tis4.Services.Projetos.ListarProjetos;

using System.Collections.Generic;
using Tis4.Models.Projeto.ProjetoModel;
using Tis4.Services.Projetos.Interfaces.IListarProjetos;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class ListarProjetos : IListarProjetos
{
    public  List<ProjetoModel> listarProjetosPorInstituicao(int ID)
    {
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Projeto\" WHERE \"idinstituicao\" = @IDInstituicao", conn);

        cmd.Parameters.AddWithValue("IDInstituicao", ID);

        var reader = cmd.ExecuteReader();

        List<ProjetoModel> projetos = new List<ProjetoModel>();

        while(reader.Read()){

            ProjetoModel projetoEncontrado = new ProjetoModel();

            projetoEncontrado.ID = (int)reader["id"];
            projetoEncontrado.IDFluxo = (int)reader["idFluxo"];
            projetoEncontrado.IDInstituicao = (int)reader["idInstituicao"];
            projetoEncontrado.IDUsuarioAlteracao = (int)reader["idusuarioalteracao"];
            projetoEncontrado.etapaAtual = reader["etapaAtual"].ToString();
            projetoEncontrado.nome = reader["nome"].ToString();
            projetoEncontrado.coordenador = reader["coordenador"].ToString();
            projetoEncontrado.dataCriacao   = (DateTime)reader["dataCriacao"];
            projetoEncontrado.dataAlteracao   = (DateTime)reader["dataAlteracao"];

            var connUser = new DataBaseConnection().dataBaseConnection();

            connUser.Open();

            var cmdUsuario = new NpgsqlCommand("SELECT nome FROM public.\"Usuario\" WHERE \"id\" = @IDUsuario", connUser);

            cmdUsuario.Parameters.AddWithValue("IDUsuario", projetoEncontrado.IDUsuarioAlteracao);

            var readerUser = cmdUsuario.ExecuteReader();

            readerUser.Read();

            projetoEncontrado.usuarioUltimaAlteracao = readerUser["nome"].ToString();

            projetos.Add(projetoEncontrado);  

            connUser.Close();

        }  

        conn.Close();

        return projetos;
    }
}