import { redirect } from 'next/navigation';

import { getUsers } from '@/actions';
import { Title, UserTable } from '@/components';

export default async function AdminOrdersPage() {
  const { data: users, ok } = await getUsers()

  if (!ok) {
    redirect('/')
  }

  if (users && users.length <= 0) {
    return (
      <>
        <Title title="Users" subtitle='User Managment' />
        <p className='text-center'>There is not users.</p>
      </>
    )
  }

  return (
    <>
      <Title title="Users" subtitle='User Managment' />
      <UserTable users={users ?? []} />
    </>
  );
}