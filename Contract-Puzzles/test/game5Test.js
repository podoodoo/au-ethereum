const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert } = require("chai")

describe("Game5", function () {
    async function deployContractAndSetVariables() {
        const Game = await ethers.getContractFactory("Game5")
        const game = await Game.deploy()

        const provider = ethers.provider
        const [owner] = await ethers.getSigners()

        const threshold = 0x00ffffffffffffffffffffffffffffffffffffff

        let account = await ethers.Wallet.createRandom().connect(provider)

        while (threshold < account.address) {
            account = await ethers.Wallet.createRandom().connect(provider)
        }

        await owner.sendTransaction({
            to: account.address,
            value: ethers.utils.parseEther("10.0")
        })

        return { game, account }
    }
    it("should be a winner", async function () {
        const { game, account } = await loadFixture(
            deployContractAndSetVariables
        )

        // good luck

        await game.connect(account).win()

        // leave this assertion as-is
        assert(await game.isWon(), "You did not win the game")
    })
})
