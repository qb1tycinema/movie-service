export class MovieMapper {
    public static toMovie(entity: any) {
        const ms = entity.releaseDate.getTime()

        return {
            ...entity,
            releaseDate: {
                seconds: Math.floor(ms / 1000),
                nanos: (ms % 1000) * 1_000_000
            }
        }
    }
}