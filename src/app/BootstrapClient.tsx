"use client";
import { useEffect } from "react";

export default function BootstrapClient() {
    useEffect(() => {
        // import dinámico (no produce side-effect en servidor)
        import("bootstrap/dist/js/bootstrap.bundle.min.js")
            .then(() => {
                /* ya cargó Bootstrap JS */
            })
            .catch((err) => {
                console.error("Error cargando Bootstrap JS:", err);
            });
    }, []);

    return null;
}