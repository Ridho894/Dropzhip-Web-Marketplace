import Input from '@/components/Core/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import Seo from '@/components/Seo'

const CreateProduct = () => {
    return (
        <AppLayout>
            <Seo templateTitle="Create Product" />
            <section className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p>CreateProduct</p>
                </div>
            </section>
        </AppLayout>
    )
}

export default CreateProduct
