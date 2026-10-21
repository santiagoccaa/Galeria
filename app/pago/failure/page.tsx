'use client'

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SuccessContent() {
    const params = useSearchParams()

    const collectionId = params.get("collection_id")
    console.log("ID FALLO", collectionId === 'null')

    return (
        <div>
            failure
        </div>
    )
}


export default function Failure() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SuccessContent />
        </Suspense>
    )
}