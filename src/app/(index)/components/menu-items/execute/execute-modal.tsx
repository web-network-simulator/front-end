'use client';

import {Button} from '@/shadcn/ui/button';
import axios, {AxiosResponse} from 'axios';
import React from 'react';
import {DataContext} from '@/app/(index)/flow/context/data-context';
import {toast} from '@/shadcn/ui/use-toast';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/shadcn/ui/dialog';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shadcn/ui/select';
import {ErrorModal} from '@/app/(index)/components/menu-items/execute/error-modal';

export const ExecuteModal = () => {
    const {nodes, edges} = React.useContext(DataContext);

    async function execute(): Promise<void> {
        toast({
            title: '処理中',
            description: '少々お待ちください。',
        });
        try {
            let response: AxiosResponse = await axios.post('/api/execute', {nodes, edges});

            toast({
                title: '処理が正常に完了しました',
                description: <ErrorModal message={await response.data} />,
            });
        } catch (error: any) {
            toast({
                title: error.response.status + ': エラー',
                description: error.response.data,
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger className='p-2'>実行</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>シミュレータ</DialogTitle>
                    <DialogDescription>
                        初期地点と終点を設定してください。
                        <div className='flex gap-3'>
                            <input
                                type='text'
                                placeholder='初期地点'
                            />
                            <input
                                type='text'
                                placeholder='終点'
                            />
                        </div>
                        <Select defaultValue='ping'>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='送信方法を選択してください' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='ping'>Ping</SelectItem>
                            </SelectContent>
                        </Select>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='justify-end'>
                    <DialogClose asChild>
                        <Button
                            variant='ghost'
                            onClick={(): void => {
                                execute().then();
                            }}>
                            実行
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};