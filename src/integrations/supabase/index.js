import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockData = {
    foo: [{ id: 1, title: 'Mock Foo' }],
    bar: [{ id: 1, foo_id: 1 }],
    events: [{ id: 1, name: 'Mock Event', date: '2023-01-01', description: 'Mock Description', venue_id: 1, is_pinned: false }],
    comments: [{ id: 1, content: 'Mock Comment', event_id: 1 }],
    venues: [{ id: 1, name: 'Mock Venue', location: 'Mock Location', description: 'Mock Description' }]
};

const mockClient = {
    from: (table) => ({
        select: () => Promise.resolve({ data: mockData[table], error: null }),
        insert: (newData) => {
            mockData[table].push(...newData);
            return Promise.resolve({ data: newData, error: null });
        },
        update: (updatedData) => {
            mockData[table] = mockData[table].map(item => item.id === updatedData.id ? updatedData : item);
            return Promise.resolve({ data: updatedData, error: null });
        },
        delete: (id) => {
            mockData[table] = mockData[table].filter(item => item.id !== id);
            return Promise.resolve({ data: null, error: null });
        }
    })
};

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

/Foo // table: foos
    id: number
    title: string

Bar // table: bars
    id: number
    foo_id: number // foreign key to Foo

Event // table: events
    id: number
    name: string
    date: string
    description: string
    venue_id: number // foreign key to Venue
    is_pinned: boolean

Comment // table: comments
    id: number
    content: string
    event_id: number // foreign key to Event

Venue // table: venues
    id: number
    name: string
    location: string
    description: string
	
*/

// Example hook for models

export const useFoo = () => useQuery({
    queryKey: ['foo'],
    queryFn: () => fromSupabase(mockClient.from('foo').select())
});
export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(mockClient.from('foo').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foo');
        },
    });
};

export const useBar = () => useQuery({
    queryKey: ['bar'],
    queryFn: () => fromSupabase(mockClient.from('bar').select())
});
export const useAddBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBar) => fromSupabase(mockClient.from('bar').insert([{ foo_id: newBar.foo_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('bar');
        },
    });
};

