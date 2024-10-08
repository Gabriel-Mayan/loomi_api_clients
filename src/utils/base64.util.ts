export const getBase64Info = ({ base64 }: { base64: string }) => {
    const [ infoExtension, infoArchive ] = base64.split(';');

    const splitExtension = infoExtension.split('');
    const extension = splitExtension.splice(splitExtension.findIndex(i => i === '/') + 1).join("").trim();
    
    const splitArchive = infoArchive.split('');
    const archive = splitArchive.splice(splitArchive.findIndex(i => i === ',') + 1).join('').trim();

    return { extension, archive };
};
