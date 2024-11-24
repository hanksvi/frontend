import { UsuarioResponseDto } from "@interfaces/usuario/UsuariosResponseDto.ts";
import { UsuarioRequestDto } from "@interfaces/usuario/UsuarioRequestDto.ts";
import Api from "../../apis/api.ts";

export const usuario = {
    // Obtener un usuario por ID
    async obtenerUsuarioPorId(id: number): Promise<UsuarioResponseDto> {
        const api = await Api.getInstance();
        const response = await api.get<void, UsuarioResponseDto>({
            url: `/usuarios/${id}`, // Usar backticks
        });
        return response.data;
    },

    // Listar todos los usuarios
    async listarUsuarios(): Promise<UsuarioResponseDto[]> {
        const api = await Api.getInstance();
        const response = await api.get<void, UsuarioResponseDto[]>({
            url: "/usuarios/listar",
        });
        return response.data;
    },

    // Actualizar un usuario
    async actualizarUsuario(id: number, data: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        const api = await Api.getInstance();
        const response = await api.put<UsuarioRequestDto, UsuarioResponseDto>(data, {
            url: `/usuarios/${id}`, // Usar backticks
        });
        return response.data;
    },

    // Eliminar un usuario
    async eliminarUsuario(id: number): Promise<void> {
        const api = await Api.getInstance();
        await api.delete({
            url: `/usuarios/${id}`, // Usar backticks
        });
    },

    // Obtener información del usuario autenticado
    async getMyInfo(): Promise<UsuarioResponseDto> {
        const api = await Api.getInstance();
        const response = await api.get<void, UsuarioResponseDto>({
            url: "/usuarios/me",
        });
        return response.data;
    },
};

