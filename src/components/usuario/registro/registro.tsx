
'use client'
import style from './registro.module.css'
import Input from '@/components/ui/input/campos'
import Card from '@/components/ui/card/card';
import Select from '@/components/ui/select/selector';
import Img from '@/components/ui/avatar/foto';
import Button from '@/components/ui/button/boton'

import { usuarioPayload, usuarioSchema } from '@/schemas/usuarioSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { obtenerTiposDeDocumento } from '@/services/frontend/tipo_documentoSevices';
import { obtenerGenero } from '@/services/frontend/generoServices';
import { obtenerRol } from '@/services/frontend/rolServices';
import { obtenerDepartamento } from '@/services/frontend/departamentoServices'
import { obtenerMunicipio } from '@/services/frontend/municipioServices'
import { SelectipoDocumento, SelectDepartamento, SelectGenero, SelectRol, SelectMunicipio } from '@/types/ui/select';


function registro() {
    const [tipos, setTipos] = useState<SelectipoDocumento[]>([]);
    const [generos, setGeneros] = useState<SelectGenero[]>([]);
    const [roles, setRoles] = useState<SelectRol[]>([]);
    const [departamentos, setDepartamentos] = useState<SelectDepartamento[]>([]);
    const [municipios, setMunicipios] = useState<SelectMunicipio[]>([]);
    const [rol, setRol] = useState<string>('');


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
            <form className={style.formGrid} onSubmit={handleSubmit(onSubmitForm)}  >
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
                    onChange={(e) => {
                        const value = e.target.value;
                        console.log("este es mi rol")
                        console.log(value)
                        setRol(value);
                    }}
                    error={errors.doc}
                />



                {rol === 'ESTUDIANTE' && (
                    <>
                        <h2 className={style.titulo_h2}>Datos del estudiante </h2>
                        <Select
                            label="Departamento"
                            name="departamento"
                            options={departamentos}
                            register={register('departamento', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                const value = Number(e.target.value);

                                obtenerMunicipio(value).then((dato) => {
                                    const opciones = dato.map((data) => ({
                                        label: data.nombre,
                                        value: data.id,
                                    }));
                                    console.log(opciones)
                                    setMunicipios(opciones)
                                });
                            }}
                            error={errors.doc}
                        />


                        <Select
                            label="Municipio"
                            name="municipio"
                            options={municipios}
                            register={register('municipio', { required: 'Este campo es obligatorio' })}
                            error={errors.doc}
                        />


                        <Input
                            label="Barrio"
                            name="barrio"
                            type='password'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}


                        />

                        <Input
                            label="Direccion"
                            name="barrio"
                            type='text'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}

                        />

                        <Input
                            label="Fecha de nacimiento"
                            name="barrio"
                            type='text'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}

                        />

                        <h2 className={style.titulo_h2}>Datos del acudiente </h2>

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
                            label="Municipio"
                            name="tipo"
                            options={roles}
                            register={register('tipo', { required: 'Este campo es obligatorio' })}
                            error={errors.doc}
                        />


                        <Input
                            label="Barrio"
                            name="barrio"
                            type='password'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}


                        />

                        <Input
                            label="Direccion"
                            name="barrio"
                            type='text'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}

                        />


                        <Input
                            label="Parentezco"
                            name="barrio"
                            type='text'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}

                        />
                    </>
                )}



                {rol === 'DOCENTE' && (
                    <>
                        <h2 className={style.titulo_h2}>Datos del docente </h2>
                        <Input
                            label="Nombre del titulo"
                            name="clave"
                            type='password'
                            placeholder="Contraseña"
                            register={register('clave')}
                            error={errors.doc}
                        />

                        <Select
                            label="Titulo"
                            name="tipo"
                            options={roles}
                            register={register('tipo', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("este es mi rol")
                                console.log(value)
                                setRol(value);
                            }}
                            error={errors.doc}
                        />


                        <Select
                            label="Grado escalafon"
                            name="tipo"
                            options={roles}
                            register={register('tipo', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("este es mi rol")
                                console.log(value)
                                setRol(value);
                            }}
                            error={errors.doc}
                        />


                        <Select
                            label="Nivel salarial"
                            name="tipo"
                            options={roles}
                            register={register('tipo', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("este es mi rol")
                                console.log(value)
                                setRol(value);
                            }}
                            error={errors.doc}
                        />


                        <Select
                            label="Nivel academico"
                            name="tipo"
                            options={roles}
                            register={register('tipo', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("este es mi rol")
                                console.log(value)
                                setRol(value);
                            }}
                            error={errors.doc}
                        />
                    </>)}



                {rol === '' || rol === 'Seleccione una opción' && (
                    <>
                        <h2 className={style.titulo_h2}>Debe seleccionar un rol </h2>
                    </>)}

              
                    <Button nombre='Registrar' className={style.boton} />
               


            </form>
        </Card>




    )
}

export default registro
