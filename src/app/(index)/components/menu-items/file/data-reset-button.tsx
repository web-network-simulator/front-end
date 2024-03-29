import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/shadcn/ui/dialog';
import {Button} from '@/shadcn/ui/button';
import React from 'react';
import {DataContext} from '@/app/(index)/flow/context/data-context';
import {Comment} from '@/app/(index)/components/menu-items/utils/comment';
import {Input} from '@/shadcn/ui/input';
import {toast} from 'sonner';

export const DataResetButton = () => {
    const {settings} = React.useContext(DataContext);
    const [input, setInput] = React.useState('');

    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <Button
                    className='w-full'
                    variant='hover_none'>
                    ローカルデータリセット
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ローカルデータを削除</DialogTitle>
                    <DialogDescription>
                        以下に「削除」と入力して実行してください。
                        <Comment comment='削除するのはローカルストレージに保存されているデータのみです。' />
                        <Comment comment='通常データを削除する場合はブラウザをリロードしてください。' />
                    </DialogDescription>
                </DialogHeader>
                <Input
                    value={input}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        setInput(event.target.value);
                    }}
                    placeholder='削除'
                    type='text'
                    className='w-full'
                />
                <DialogFooter className='justify-end'>
                    <DialogClose asChild>
                        <Button
                            variant='destructive'
                            onClick={(): void => {
                                if (input !== '削除') {
                                    toast.error('Error', {description: '入力された値(' + input + ')が「削除」と一致しません。'});
                                    return;
                                }
                                try {
                                    localStorage.removeItem('local_backup');
                                    toast.success('Success', {description: 'ローカルストレージのデータを正常に削除しました。'});
                                } catch (error: any) {
                                    console.error('Local storage data reset error: ', error);
                                    toast.error('Error', {description: 'ローカルストレージのデータの削除に失敗しました。'});
                                }
                                // 入力データのリセット
                                setInput('');
                            }}>
                            実行
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
