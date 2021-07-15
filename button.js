function switchname(self) {
    if(self.value === 'sine') {
        self.value = 'triangle';
    } else if(self.value === 'triangle') {
        self.value = 'sawtooth';
    } else if(self.value === 'sawtooth') {
        self.value = 'square';
    } else if(self.value === 'square') {
        self.value = 'sine';
    }
}