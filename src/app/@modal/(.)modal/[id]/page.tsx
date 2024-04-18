import { CreateBudgetForm, Modal } from '@/ui/components';

export default function ModalPage({ params }: { params: { slug: string } }) {
	return (
		<Modal>
			<CreateBudgetForm />
		</Modal>
	);
}
