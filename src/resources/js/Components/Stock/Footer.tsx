import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-auto py-8 px-8 border-t border-gray-800 text-gray-500 text-[10] text-center">
            <p>
                このサイトで使用している画像素材は{""}
                <a
                    href="https://jp.freepik.com/"
                    target="_blank"
                    rel="noopener"
                    className="text-sky-500 hover:underline"
                >
                    Freepik
                </a>
                {""}
                提供のものです。 Images used in this site are from{""}
                <a
                    href="https://jp.freepik.com/"
                    target="_blank"
                    rel="noopener"
                    className="text-sky-500 hover:underline"
                >
                    Freepik
                </a>
                .
            </p>
        </footer>
    );
}