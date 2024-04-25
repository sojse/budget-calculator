import { capitalizeFirstLetter } from '@/helpers/string';
import { Modal } from '@/ui/components';
import * as Forms from '@/ui/components/3-organisms/Forms';

export default function ModalPage({ params }: { params: { id: string } }) {
	const formName = `${capitalizeFirstLetter(params.id)}Form`;
	const DynamicForm = Forms[formName as keyof typeof Forms];

	return (
		<Modal>
			<DynamicForm />
		</Modal>
	);
}
