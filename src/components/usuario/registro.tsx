
'use client'
import style from './registro.module.css'
import Form from '@/components/ui/forms/formulario'
import Input from '@/components/ui/input/campos'
import Card from '@/components/ui/card/card';
import Select from '@/components/ui/select/selector';
import Img from '@/components/ui/avatar/foto';

import { usuarioPayload, usuarioSchema } from '@/schemas/usuarioSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { obtenerTiposDeDocumento } from '@/services/frontend/tipo_documentoSevices';
import { obtenerGenero } from '@/services/frontend/generoServices';
import { obtenerRol } from '@/services/frontend/rolServices';
import { obtenerDepartamento } from '@/services/frontend/departamentoServices'
import { SelectipoDocumento, SelectDepartamento, SelectGenero, SelectRol } from '@/types/ui/select';


function registro() {
    const [tipos, setTipos] = useState<SelectipoDocumento[]>([]);
    const [generos, setGeneros] = useState<SelectGenero[]>([]);
    const [roles, setRoles] = useState<SelectRol[]>([]);
    const [departamentos, setDepartamentos] = useState<SelectDepartamento[]>([]);
    useEffect(() => {
        obtenerTiposDeDocumento().then((dato) => {
            const opciones = dato.map((data) => ({
                label: data.id,
                value: data.id,
            }));
            setTipos(opciones)
        });

        obtenerGenero().then((dato) => {
            const opciones = dato.map((data) => ({
                label: data.genero,
                value: data.genero,
            }));
            setGeneros(opciones)
        });

        obtenerRol().then((dato) => {
            const opciones = dato.map((data) => ({
                label: data.rol,
                value: data.rol,
            }));
            setRoles(opciones)
        });

        obtenerDepartamento().then((dato) => {
            const opciones = dato.map((data) => ({
                label: data.nombre,
                value: data.id,
            }));
            setDepartamentos(opciones)
        });
    }, []);





    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<usuarioPayload>({
        resolver: zodResolver(usuarioSchema),
    });

    const onSubmitForm = async (datos: usuarioPayload) => {
        try {
            const res = await fetch("/api/tipo_documento", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
            console.log(res)
        } catch (error) {
            console.error("Error al consultar el usuario:", error);
        }

    };

    return (

        <Card className={style.card}>
            <Form onSubmit={handleSubmit(onSubmitForm)} columns={4} >
                <div className={style.titulo}>
                    <h1>Registro estudiante</h1>
                </div>

                <div className={style.container_img}>
                    <Img />
                </div>
                <h2 className={style.titulo_h2}>Datos Personales</h2>

                <Select
                    label="Tipo de documento"
                    name="tipo"
                    options={tipos}
                    register={register('tipo', { required: 'Este campo es obligatorio' })}
                    error={errors.doc}
                />

                <Input
                    label="Numero de documento"
                    name="doc"
                    placeholder="Numero de documento"
                    register={register('doc')}
                    error={errors.doc}
                />

                <Input
                    label="Primer nombre"
                    name="n1"
                    placeholder="Primer nombre"
                    register={register('doc')}
                    error={errors.doc}
                />

                <Input
                    label="Segundo nombre"
                    name="n2"
                    placeholder="Segundo nombre"
                    register={register('n2')}
                    error={errors.doc}
                />

                <Input
                    label="Primer apellido"
                    name="ap1"
                    placeholder="Primer apellido"
                    register={register('ap1')}
                    error={errors.doc}
                />

                <Input
                    label="Segundo apellido"
                    name="ap2"
                    placeholder="Primer apellido"
                    register={register('ap2')}
                    error={errors.doc}
                />
                <Select
                    label="Genero"
                    name="genero"
                    options={generos}
                    register={register('genero', { required: 'Este campo es obligatorio' })}
                    error={errors.doc}
                />
                {/*     <Input
                    label="Fecha de nacimiento"
                    name=" fecha_nacimiento"
                    type='date'
                    placeholder="Fecha de nacimiento"
                    register={register('fecha_nacimiento')}
                    error={errors.doc}
                /> */}
                <Input
                    label="Correo electrónico"
                    name="email"
                    type='email'
                    placeholder="Correo electrónico"
                    register={register('email')}
                    error={errors.doc}
                />

                {/*   <Input
                    label="Direccion de residencia"
                    name="ubicacion"
                    placeholder="Direccion de residencia"
                    register={register('ubicacion')}
                    error={errors.doc}
                /> */}

                <Input
                    label="Teléfono"
                    name="tel"
                    placeholder="Teléfono"
                    register={register('tel')}
                    error={errors.doc}
                />

                <Input
                    label="Contraseña"
                    name="clave"
                    type='password'
                    placeholder="Contraseña"
                    register={register('clave')}
                    error={errors.doc}
                />

                <Select
                    label="Rol"
                    name="tipo"
                    options={roles}
                    register={register('tipo', { required: 'Este campo es obligatorio' })}
                    error={errors.doc}
                />


                <h2 className={style.titulo_h2}>Ubicacion de residencia </h2>

                <Select
                    label="Departamento"
                    name="departamento"
                    options={departamentos}
                    register={register('tipo', { required: 'Este campo es obligatorio' })}
                    onChange={(e) => {
                        const value = e.target.value;
                        console.log("passssss")
                        console.log(value);
                        console.log("passssss")
                        /* setMunicipiosFiltrados(municipios.filter(m => m.FK_DEPARTAMENTO === value)); */
                    }}

                    error={errors.doc}
                />


                <Select
                    label="Rol"
                    name="tipo"
                    options={roles}
                    register={register('tipo', { required: 'Este campo es obligatorio' })}
                    error={errors.doc}
                />
            </Form>
        </Card>




    )
}

export default registro
