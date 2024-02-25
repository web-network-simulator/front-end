import {useTheme} from 'next-themes';
import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/shadcn/ui/select';
import {SelectIcon} from '@radix-ui/react-select';
import {Label} from '@/shadcn/ui/label';
import {MenubarItem} from '@/shadcn/ui/menubar';
import {DataContext} from '@/app/(index)/flow/context/data-context';
import {ThemeValue} from '@/app/(index)/flow/context/IThemeValue';

export const ThemeButton = () => {
    const {settings, setSettings} = React.useContext(DataContext);

    const {setTheme} = useTheme();

    return (
        <MenubarItem className='grid w-full max-w-sm items-center gap-1.5'>
            <Label>Theme</Label>
            <Select
                onValueChange={(value: ThemeValue): void => {
                    setSettings({
                        ...settings,
                        pageTheme: value,
                    });
                    setTheme(value);
                }}>
                <SelectTrigger>Theme Change</SelectTrigger>
                <SelectContent>
                    <SelectItem value='system'>
                        <SelectIcon />
                        System
                    </SelectItem>
                    <SelectItem value='dark'>
                        <SelectIcon />
                        Dark
                    </SelectItem>
                    <SelectItem value='light'>
                        <SelectIcon />
                        Light
                    </SelectItem>
                </SelectContent>
            </Select>
        </MenubarItem>
    );
};