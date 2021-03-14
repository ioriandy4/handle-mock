interface config {
    url: string,
    params?: object,
    mockData: object,
    target?: string
}

declare function handleMock(config: config[], defaultHost: string): any;
export = handleMock;