
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
import { obtenerFormacion } from '@/services/frontend/formacionServices'
import { obtenerEscalafon } from '@/services/frontend/escalafonServices'
import { obtenerNivelAcademico } from '@/services/frontend/nivelAcademicoServices'
import { obtenerNivelSalarial } from '@/services/frontend/nivelSalarialServices'
import { obtenerGrados } from '@/services/frontend/gradosServices'
import { SelectipoDocumento, SelectDepartamento, SelectGenero, SelectRol, SelectMunicipio, SelectFormacion, SelectEscalafon, SelectNivelSalarial, SelectNivelAcademico, Grado } from '@/types/ui/select';
import { useRouter } from 'next/navigation';




function registro() {
    const [tipos, setTipos] = useState<SelectipoDocumento[]>([]);
    const [generos, setGeneros] = useState<SelectGenero[]>([]);
    const [roles, setRoles] = useState<SelectRol[]>([]);
    const [departamentos, setDepartamentos] = useState<SelectDepartamento[]>([]);
    const [municipios, setMunicipios] = useState<SelectMunicipio[]>([]);
    const [municipios_acudiente, setMunicipiosAcudiente] = useState<SelectMunicipio[]>([]);
    const [formacion, setFormacion] = useState<SelectFormacion[]>([]);
    const [escalafon, setEscalafon] = useState<SelectEscalafon[]>([]);
    const [nivel_salarial, setNivelSalarial] = useState<SelectNivelSalarial[]>([]);
    const [nivel_academico, setNivelAcademico] = useState<SelectNivelAcademico[]>([]);
    const [grado, setGrado] = useState<Grado[]>([]);
    const [succes, setSucces] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
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


    useEffect(() => {
        console.log("Errores actuales:", errors);
    }, [errors]);

   const onSubmitForm = async (datos: usuarioPayload) => {
        try {
            const res = await fetch("/api/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });

            const data = await res.json();
            console.log("Respuesta del backend:");
            console.dir(data, { depth: null });

            if (res.ok) {
                setSucces("Solicitud de registro exitosa");
                setTimeout(() => {
                    router.push("/")
                }, 3000)
            } else {
                console.error(" Error del backend:", data.error);
                if (data.detalles) {
                    console.dir(data.detalles, { depth: null }); 
                }
                setError("No se pudo registrar el usuario " + data.error);
            }
        } catch (error: any) {
            console.error("Error inesperado al registrar el usuario:", error.message || error);
            setError("Error inesperado. Intenta nuevamente.");
        }
    };


    return (<>


        <Card className={style.card}>
            <form className={style.formGrid} onSubmit={handleSubmit(onSubmitForm)}  >
                <div className={style.titulo}>
                    <h1 className={style.textos}> <span className={style.texto_span}>Reg</span>istro persona</h1>
                </div>

                <div className={style.container_img}>
                    <Img />
                </div>
                <h2 className={style.titulo_h2}>Datos Personales</h2>

                <Select
                    label="Tipo de documento"
                    name="tipo"
                    options={tipos}
                    register={register('tipo')}
                    error={errors.tipo}
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
                    register={register('n1')}
                    error={errors.n1}
                />

                <Input
                    label="Segundo nombre"
                    name="n2"
                    placeholder="Segundo nombre"
                    register={register('n2')}
                    error={errors.n2}
                />

                <Input
                    label="Primer apellido"
                    name="ap1"
                    placeholder="Primer apellido"
                    register={register('ap1')}
                    error={errors.ap1}
                />

                <Input
                    label="Segundo apellido"
                    name="ap2"
                    placeholder="Segundo apellido"
                    register={register('ap2')}
                    error={errors.ap2}
                />
                <Select
                    label="Genero"
                    name="genero"
                    options={generos}
                    register={register('genero', { required: 'Este campo es obligatorio' })}
                    error={errors.genero}
                />

                <Input
                    label="Correo electrónico"
                    name="email"
                    type='email'
                    placeholder="Correo electrónico"
                    register={register('email')}
                    error={errors.email}
                />



                <Input
                    label="Teléfono"
                    name="tel"
                    placeholder="Teléfono"
                    register={register('tel')}
                    error={errors.tel}
                />

                <Input
                    label="Contraseña"
                    name="clave"
                    type='password'
                    placeholder="Contraseña"
                    register={register('clave')}
                    error={errors.clave}
                />

                <Select
                    label="Rol"
                    name="rol"
                    options={roles}
                    register={register('rol')}
                    onChange={(e) => {
                        const value = e.target.value;
                        setRol(value)

                        if (value === "DOCENTE") {
                            obtenerFormacion().then((dato) => {
                                const opciones = dato.map((data) => ({
                                    label: data.formacion,
                                    value: data.id,
                                }));
                                setFormacion(opciones)
                            });

                            obtenerEscalafon().then((dato) => {
                                const opciones = dato.map((data) => ({
                                    label: data.escalafon,
                                    value: data.id,
                                }));
                                setEscalafon(opciones)
                            });
                            obtenerNivelSalarial().then((dato) => {
                                const opciones = dato.map((data) => ({
                                    label: data.nivel,
                                    value: data.id,
                                }));
                                setNivelSalarial(opciones)
                            });

                            obtenerNivelAcademico().then((dato) => {
                                const opciones = dato.map((data) => ({
                                    label: data.nivel,
                                    value: data.id,
                                }));
                                setNivelAcademico(opciones)
                            });
                        } else if (value === "ESTUDIANTE") {
                            obtenerGrados().then((dato) => {
                                const opciones = dato.map((data) => ({
                                    label: data.grado,
                                    value: data.id
                                }));
                                setGrado(opciones)
                            });

                        }
                    }}
                    error={errors.rol}

                />

                <Select
                    label="Departamento"
                    name="departamento"
                    options={departamentos}
                    register={register('departamento')}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        obtenerMunicipio(value).then((dato) => {
                            const opciones = dato.map((data) => ({
                                label: data.nombre,
                                value: data.id,
                            }));
                            setMunicipios(opciones)
                        });
                    }}

                    error={errors.departamento}
                />


                <Select
                    label="Municipio"
                    name="municipio"
                    options={municipios}
                    register={register('municipio', { required: 'Este campo es obligatorio' })}
                    error={errors.municipio}
                />


                <Input
                    label="Barrio"
                    name="barrio"
                    type='text'
                    placeholder="Barrio"
                    register={register('barrio')}
                    error={errors.barrio}


                />

                <Input
                    label="Direccion"
                    name="direccion"
                    type='text'
                    placeholder="Direccion"
                    register={register('direccion')}
                    error={errors.direccion}

                />





                {rol === 'ESTUDIANTE' && (
                    <>
                        <h2 className={style.titulo_h2}>Datos del estudiante </h2>

                        <Select
                            label="Grado"
                            name="grado"
                            options={grado}
                            register={register('grado')}

                        />

                        <h2 className={style.titulo_h2}>Datos del acudiente </h2>

                        <Input
                            label="Numero de documento"
                            name="numero_documento_acudiente"
                            placeholder="Documento"
                            register={register('numero_documento_acudiente')}
                            error={errors.numero_documento_acudiente}
                        />

                        <Input
                            label="Primer nombre"
                            name="n1_acudiente"
                            placeholder="Primer nombre"
                            register={register('n1_acudiente')}
                            error={errors.n1_acudiente}
                        />

                        <Input
                            label="Segundo nombre"
                            name="n2_acudiente"
                            placeholder="Segundo nombre"
                            register={register('n2_acudiente')}
                            error={errors.n2_acudiente}
                        />

                        <Input
                            label="Primer apellido"
                            name="ap1_acudiente"
                            placeholder="Primer apellido"
                            register={register('ap1_acudiente')}
                            error={errors.ap1_acudiente}
                        />

                        <Input
                            label="Segundo apellido"
                            name="ap2_acudiente"
                            placeholder="Primer apellido"
                            register={register('ap2_acudiente')}
                            error={errors.ap2_acudiente}
                        />


                        <Input
                            label="Correo electrónico"
                            name="correo_acudiente"
                            type='email'
                            placeholder="Correo electrónico"
                            register={register('correo_acudiente')}
                            error={errors.correo_acudiente}
                        />



                        <Input
                            label="Teléfono"
                            name="telefono_acudiente"
                            placeholder="Teléfono"
                            register={register('telefono_acudiente')}
                            error={errors.telefono_acudiente}
                        />

                        <Select
                            label="Departamento"
                            name="departamento_acudiente"
                            options={departamentos}
                            register={register('departamento_acudiente', { required: 'Este campo es obligatorio' })}
                            onChange={(e) => {
                                { console.log("departamento acudiente") }
                                const value = Number(e.target.value);
                                obtenerMunicipio(value).then((dato) => {
                                    const opciones = dato.map((data) => ({
                                        label: data.nombre,
                                        value: data.id,
                                    }));
                                    setMunicipiosAcudiente(opciones)
                                });
                            }}
                            error={errors.departamento_acudiente}
                        />


                        <Select
                            label="Municipio"
                            name="municipio_acudiente"
                            options={municipios_acudiente}
                            register={register('municipio_acudiente', { required: 'Este campo es obligatorio' })}
                            error={errors.municipio_acudiente}
                        />


                        <Input
                            label="Barrio"
                            name="barrio_acudiente"
                            type='text'
                            placeholder="Barrio"
                            register={register('barrio_acudiente')}
                            error={errors.barrio_acudiente}
                        />

                        <Input
                            label="Direccion"
                            name="direccion_acudiente"
                            type='text'
                            placeholder="Direccion"
                            register={register('direccion_acudiente')}
                            error={errors.direccion_acudiente}

                        />


                        <Input
                            label="Parentezco"
                            name="parentezco"
                            type='text'
                            placeholder="Parentezco"
                            register={register('parentezco')}
                            error={errors.parentezco}

                        />
                    </>
                )}


                {rol === 'DOCENTE' && (
                    <>
                        <h2 className={style.titulo_h2}>Datos del docente </h2>
                        <Input
                            label="Titulo de formacion academica"
                            name="titulo_formacion"
                            type='text'
                            placeholder="Titulo de formacion academica"
                            register={register('titulo_formacion')}
                            error={errors.titulo_formacion}
                        />

                        <Select
                            label="Formacion"
                            name="formacion"
                            options={formacion}
                            register={register('formacion')}
                            onChange={(e) => {
                                const value = e.target.value;

                            }}
                            error={errors.formacion}
                        />


                        <Select
                            label="Grado escalafon"
                            name="grado_escalafon"
                            options={escalafon}
                            register={register('grado_escalafon')}
                            onChange={(e) => {
                                const value = e.target.value;

                            }}
                            error={errors.grado_escalafon}
                        />


                        <Select
                            label="Nivel salarial"
                            name="nivel_salarial"
                            options={nivel_salarial}
                            register={register('nivel_salarial')}
                            onChange={(e) => {
                                const value = e.target.value;

                            }}
                            error={errors.nivel_salarial}
                        />


                        <Select
                            label="Nivel academico"
                            name="nivel_academico"
                            options={nivel_academico}
                            register={register('nivel_academico')}
                            onChange={(e) => {
                                const value = e.target.value;

                            }}
                            error={errors.nivel_academico}
                        />
                    </>)}






                <Button type="submit" nombre='Registrar' className={style.boton} />

                {/* {succes && <p className={style['succes-user']}>{succes}</p>} */}
                {succes ? (
                    <p className={style['succes-user']}>{succes}</p>
                ) : error && (
                    <p className={style['error-user']}>{error}</p>
                )}
            </form>
        </Card>
    </>





    )
}

export default registro
