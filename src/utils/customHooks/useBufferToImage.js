// Converte um Buffer para um src de uma tag img

export default function useBufferToImage(buffer){
        const {data} = buffer;
        const img =  Buffer.from(data).toString("base64");

        return "data:image/png;base64," + img;

}