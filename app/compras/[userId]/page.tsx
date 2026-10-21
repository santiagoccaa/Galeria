import CardPurchase from "@/components/CardPurchase/CardPurchase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { CalendarDays, CreditCard, Package, Store } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ComprasPageProps {
  params: Promise<{ userId: string }>
}

export default async function ComprasPage({ params }: ComprasPageProps) {

  const { userId } = await params

  const compras = await prisma.purchasesUser.findMany({
    where: {
      userId
    },
    include: {
      article: {
        select: {
          imageUrl: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  if (compras.length === 0) {
    return (
      <div className="flex min-h-100 w-full flex-col items-center justify-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <Package className="size-8 text-muted-foreground" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            No hay compras registradas
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Cuando realices una compra, aparecerá aquí.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/inventario">
              <Store />
              Ir a comprar
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Mis compras
        </h1>

        <p className="mt-1 text-muted-foreground">
          Aquí puedes consultar el historial de tus compras.
        </p>
      </div>

      <div className="space-y-4">
        {compras.map((compra) => {
          return (
            <CardPurchase
              key={compra.id}
              articleId={compra.articleId}
              createdAt={String(compra.createdAt)}
              mercadoPagoPaymentId={compra.mercadoPagoPaymentId}
              price={compra.price}
              productName={compra.productName}
              quantity={compra.quantity}
            />
          )
        })}
      </div>

    </div>
  )
}