'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { changeDescription } from '../_actions/change-bio'
import { changeName } from '../_actions/change-name'

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome deve ter pelo menos 1 caractere')
    .max(15, 'Nome deve ter até 15 caracteres'),
  bio: z
    .string()
    .min(1, 'Biografia deve ter no minimo 1 caractere')
    .max(200, 'Biografia deve ter no máximo 200 caracteres'),
})

type FormData = z.infer<typeof formSchema>

interface UserDataFormProps {
  name: string | null
  bio: string | null
}

export function UserDataForm({ name, bio }: UserDataFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ?? '',
      bio: bio ?? '',
    },
  })

  async function onSubmit(data: FormData) {
    const { bio, name } = data

    if (
      form.formState.defaultValues?.name &&
      form.formState.defaultValues.name !== name
    ) {
      try {
        const response = await changeName({
          name,
        })

        if (response.error) {
          toast.error('Erro ao alterar o nome. Tente novamente.')
          return
        }
        form.reset(form.getValues())
        toast.success('Nome alterado com sucesso!')
      } catch (error) {
        toast.error('Erro ao alterar o nome. Tente novamente.')
      }
    }

    if (
      form.formState.defaultValues?.bio &&
      form.formState.defaultValues.bio !== bio
    ) {
      try {
        const response = await changeDescription({
          description: bio,
        })

        if (response.error) {
          toast.error('Erro ao alterar a biografia. Tente novamente.')
          return
        }
        form.reset(form.getValues())
        toast.success('Biografia alterada com sucesso!')
      } catch (error) {
        toast.error('Erro ao alterar a biografia. Tente novamente.')
      }
    }
  }

  return (
    <Card className="h-fit border-0 bg-white/90 shadow-xl backdrop-blur-sm duration-300 hover:bg-white">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
          Suas informações
        </CardTitle>
        <CardDescription className="">
          Aqui você pode visualizar e atualizar seus dados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome..."
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua biografia..."
                      {...field}
                      className="h-32 resize-none bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="cursor-pointer self-end"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Carregando...' : 'Salvar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
