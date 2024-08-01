export const getBase64Info = ({ base64 }: { base64: string }) => {
    const [ infoExtension, infoArchive ] = base64.split(';');

    const splitExtension = infoExtension.split('');
    const extension = splitExtension.splice(0, splitExtension.findIndex(i => i === '/') + 1).join().trim();
    
    const splitArchive = infoArchive.split('');
    const archive = splitArchive.splice(0, splitArchive.findIndex(i => i === ',') + 1).join().trim();

    return { extension, archive };
};
